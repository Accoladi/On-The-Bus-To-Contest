import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const WORDS_PER_PAGE = 350;
const SHORT_PAGE_WORDS = WORDS_PER_PAGE / 2;
const MIN_WORDS_BEFORE_BREAK = 180;
const MAX_PARAGRAPHS_PER_PAGE = 16;

function wordsIn(element) {
  return (element.textContent.match(/\S+/g) || []).length;
}

function withoutRunningHead(html) {
  const fragment = document.createElement('div');
  fragment.innerHTML = html;
  fragment.querySelectorAll('.book-page-running-head').forEach((runningHead) => runningHead.remove());
  return fragment.innerHTML;
}

function makePages(bookHtml) {
  const source = document.createElement('div');
  source.innerHTML = bookHtml;
  const pages = [];

  [...source.querySelectorAll('section')].forEach((section, chapterIndex) => {
    const title = section.dataset.title || `Chapter ${chapterIndex + 1}`;
    const elements = [...section.children];
    const heading = elements.shift();
    let current = heading ? heading.outerHTML : '';
    let count = heading ? wordsIn(heading) : 0;
    let paragraphCount = 0;

    const publishPage = () => {
      if (!current) return;
      pages.push({ html: current, chapterIndex, title, wordCount: count });
    };

    elements.forEach((element) => {
      const elementWords = wordsIn(element);
      const isFullByWords = count >= MIN_WORDS_BEFORE_BREAK && count + elementWords > WORDS_PER_PAGE;
      if (paragraphCount > 0 && (isFullByWords || paragraphCount >= MAX_PARAGRAPHS_PER_PAGE)) {
        publishPage();
        current = `<p class="book-page-running-head">${title}</p>`;
        count = 0;
        paragraphCount = 0;
      }
      current += element.outerHTML;
      count += elementWords;
      paragraphCount += 1;
    });
    publishPage();
  });

  // Avoid leaving a short trailing fragment stranded on its own page. Only
  // merge within a chapter so a new chapter always starts on a fresh page.
  for (let index = 1; index < pages.length; index += 1) {
    const page = pages[index];
    const previousPage = pages[index - 1];
    if (page.chapterIndex === previousPage.chapterIndex && page.wordCount < SHORT_PAGE_WORDS) {
      previousPage.html += withoutRunningHead(page.html);
      previousPage.wordCount += page.wordCount;
      pages.splice(index, 1);
      index -= 1;
    }
  }

  return pages;
}

export default function BookReader({ book, bookHtml }) {
  const pages = useMemo(() => makePages(bookHtml), [bookHtml]);
  const [pageIndex, setPageIndex] = useState(0);
  const pageStartRef = useRef(null);
  const previousPageIndexRef = useRef(pageIndex);
  const lastPageIndex = Math.max(0, pages.length - 1);
  const visiblePages = pages.slice(pageIndex, pageIndex + 1);
  const canGoBack = pageIndex > 0;
  const canGoForward = pageIndex < lastPageIndex;

  useEffect(() => {
    setPageIndex((current) => Math.min(current, lastPageIndex));
  }, [lastPageIndex]);

  useEffect(() => {
    if (previousPageIndexRef.current !== pageIndex) {
      pageStartRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      previousPageIndexRef.current = pageIndex;
    }
  }, [pageIndex]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.target.closest('select, input, textarea, button, a')) return;
      if (event.key === 'ArrowLeft' && canGoBack) setPageIndex((current) => Math.max(0, current - 1));
      if (event.key === 'ArrowRight' && canGoForward) setPageIndex((current) => Math.min(lastPageIndex, current + 1));
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [canGoBack, canGoForward, lastPageIndex]);

  const openChapter = (event) => {
    const chapterIndex = Number(event.target.value);
    const firstPage = pages.findIndex((page) => page.chapterIndex === chapterIndex);
    if (firstPage >= 0) setPageIndex(firstPage);
  };

  if (!pages.length) return null;

  return <section className="book-reader-shell" aria-label={`${book.title} reader`}>
    <div className="book-reader-toolbar">
      <label className="book-reader-chapter-picker">Chapter
        <select value={visiblePages[0]?.chapterIndex ?? 0} onChange={openChapter}>
          {book.sections.map(([, title], index) => <option key={title} value={index}>{title}</option>)}
        </select>
      </label>
      <p aria-live="polite">Page {pageIndex + 1} of {pages.length}</p>
    </div>

    <div ref={pageStartRef} className="book-page-spread">
      {visiblePages.map((page) => <article className="book-page" key={`${pageIndex}`} aria-label={`${page.title}, page ${pageIndex + 1}`}>
        <div dangerouslySetInnerHTML={{ __html: page.html }} />
        <span className="book-page-number" aria-hidden="true">{pageIndex + 1}</span>
      </article>)}
    </div>

    <nav className="book-reader-controls" aria-label="Page navigation">
      <button type="button" onClick={() => setPageIndex((current) => Math.max(0, current - 1))} disabled={!canGoBack}><ChevronLeft size={18} /> Previous</button>
      <button type="button" onClick={() => setPageIndex((current) => Math.min(lastPageIndex, current + 1))} disabled={!canGoForward}>Next <ChevronRight size={18} /></button>
    </nav>
  </section>;
}
