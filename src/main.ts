const html = document.documentElement
html.classList.add('js')

document.getElementById('theme-toggle')?.addEventListener('click', () => {
  const isDark = html.classList.toggle('dark')
  html.style.colorScheme = isDark ? 'dark' : 'light'

  try {
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  } catch {}
})

const revealItems = document.querySelectorAll('[data-reveal]')
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('in'))
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('in')
        observer.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
  )

  revealItems.forEach((item) => observer.observe(item))
}
