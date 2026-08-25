// The DB stores categories as the exact Hebrew strings from
// reado-admin/lib/books/categories.ts — that list is a hard contract with the
// mobile app, so it is the source of truth here too.
export const CATEGORY_TABS = [
  { id: 'הרגלים והתמדה', name: 'הרגלים והתמדה', icon: 'habits-icon.png' },
  { id: 'כסף והשקעות', name: 'כסף והשקעות', icon: 'money-icon.png' },
  { id: 'עסקים ויזמות', name: 'עסקים ויזמות', icon: 'business-icon.png' },
  { id: 'תודעה והתפתחות פנימית', name: 'תודעה והתפתחות', icon: 'consciousness-icon.png' },
  { id: 'תקשורת והשפעה', name: 'תקשורת והשפעה', icon: 'communication-icon.png' },
  { id: 'קריירה וניהול עצמי', name: 'קריירה וניהול עצמי', icon: 'career-icon.png' }
];

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

// One anonymous GET against PostgREST rather than the supabase-js client: this
// runs on the marketing page's critical path and the SDK costs ~45 kB gzipped
// for a single read. Anonymous access is granted by the two "readable by
// everyone" RLS policies (reado-admin migration 20260825120000).
const QUERY = [
  'select=id,title,author,categories,cover_url,book_summary_sections(section_number,audio_url)',
  'status=eq.published',
  // Embedded filter, not an inner join: a book with no section audio still
  // shows up, just without a player.
  'book_summary_sections.section_number=eq.1',
  'order=published_at.desc'
].join('&');

// Published books, newest first, each with the audio of its opening section —
// the same clip the app plays first, which is what the carousel previews.
export async function fetchPublishedBooks() {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/books?${QUERY}`, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`
    }
  });

  if (!response.ok) {
    throw new Error(`books request failed: ${response.status} ${await response.text()}`);
  }

  const rows = await response.json();

  return rows
    // A cover-less book would render as a broken image in the carousel.
    .filter(row => row.cover_url)
    .map(row => ({
      id: row.id,
      title: row.title,
      author: row.author,
      image: row.cover_url,
      categories: row.categories || [],
      audioUrl: row.book_summary_sections?.[0]?.audio_url || null
    }));
}
