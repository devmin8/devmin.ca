const html = document.documentElement

// CSS uses this class to enable the reveal animation only when JavaScript is running.
// Without JavaScript, the content stays visible by default.
html.classList.add('js')

document.getElementById('theme-toggle')?.addEventListener('click', () => {
  // Toggle the same `dark` class that the inline head script sets on first load.
  const isDark = html.classList.toggle('dark')

  // Tell the browser which built-in form/control color palette to use.
  html.style.colorScheme = isDark ? 'dark' : 'light'

  try {
    // Remember the user's choice for the inline head script to reuse on the next page load.
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  } catch {}
})

// Elements with `data-reveal` start hidden in CSS and become visible when `in` is added.
const revealItems = document.querySelectorAll('[data-reveal]')

// Respect the OS accessibility setting by skipping motion for users who prefer less animation.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

if (reduceMotion || !('IntersectionObserver' in window)) {
  // If animation should not run, or the browser lacks the observer API, show everything now.
  revealItems.forEach((item) => item.classList.add('in'))
} else {
  // Watch each reveal item and animate it the first time it enters the viewport.
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue

        entry.target.classList.add('in')

        // Stop watching after the first reveal so it does not animate repeatedly.
        observer.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
  )

  revealItems.forEach((item) => observer.observe(item))
}
