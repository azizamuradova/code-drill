(function () {
  const root = document.documentElement;
  try {
    const saved = localStorage.getItem('cd-theme');
    if (saved) root.setAttribute('data-theme', saved);
  } catch (e) {}

  document.addEventListener('click', (e) => {
    const themeBtn = e.target.closest('[data-theme-toggle]');
    if (themeBtn) {
      const isDark =
        root.getAttribute('data-theme') === 'dark' ||
        (!root.getAttribute('data-theme') &&
          matchMedia('(prefers-color-scheme: dark)').matches);
      const next = isDark ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try {
        localStorage.setItem('cd-theme', next);
      } catch (e) {}
    }
    const menuBtn = e.target.closest('[data-menu-toggle]');
    if (menuBtn) document.querySelector('.nav')?.classList.toggle('open');
    const tab = e.target.closest('[data-tab]');
    if (tab) {
      const group = tab.closest('[data-tabs]');
      group
        .querySelectorAll('[data-tab]')
        .forEach((b) => b.classList.toggle('active', b === tab));
      document
        .querySelectorAll(".tab-panel[data-group='" + group.dataset.tabs + "']")
        .forEach((p) => p.classList.toggle('active', p.id === tab.dataset.tab));
    }
    const seg = e.target.closest('.segmented button');
    if (seg)
      seg.parentElement
        .querySelectorAll('button')
        .forEach((b) => b.classList.toggle('active', b === seg));
  });
  document.querySelectorAll('.editor').forEach((ed) => {
    const ta = ed.querySelector('textarea');
    const gutter = ed.querySelector('.gutter');
    const render = () => {
      const n = ta.value.split('\n').length;
      gutter.innerHTML = Array.from({ length: n }, (_, i) => i + 1).join(
        '<br>',
      );
    };
    ta.addEventListener('input', render);
    ta.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const s = ta.selectionStart;
        ta.value =
          ta.value.slice(0, s) + '    ' + ta.value.slice(ta.selectionEnd);
        ta.selectionStart = ta.selectionEnd = s + 4;
        render();
      }
    });
    render();
  });
})();
