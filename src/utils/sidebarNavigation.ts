export const NAVIGATION_OFFSET_PX = 20;

type ScrollSettings = {
  pixelsPerMs: number;
  minDurationMs: number;
  maxDurationMs: number;
};

type MoveIndicatorsParams = {
  index: number;
  desktopIndicator: HTMLElement | null;
  desktopItems: HTMLElement[];
  mobileIndicator: HTMLElement | null;
  mobileItems: HTMLElement[];
};

export const SCROLL_SETTINGS: ScrollSettings = {
  pixelsPerMs: 1.35,
  minDurationMs: 280,
  maxDurationMs: 900,
};

export function revealNavigation(
  sidebar: HTMLElement | null,
  mobileNav: HTMLElement | null,
  delayMs = 400,
): void {
  if (sidebar) {
    setTimeout(function () {
      sidebar.classList.remove(
        "opacity-0",
        "-translate-x-2",
        "pointer-events-none",
      );
      sidebar.style.visibility = "visible";
    }, delayMs);
  }

  if (mobileNav) {
    setTimeout(function () {
      mobileNav.classList.remove(
        "opacity-0",
        "translate-y-2",
        "pointer-events-none",
      );
    }, delayMs);
  }
}

export function getSectionsFromNavItems(
  navItems: HTMLElement[],
): Array<HTMLElement | null> {
  return navItems.map(function (item) {
    const sectionId = item.getAttribute("data-id");
    return sectionId ? document.getElementById(sectionId) : null;
  });
}

export function getTargetYForSection(
  section: HTMLElement,
  offsetPx = NAVIGATION_OFFSET_PX,
): number {
  return section.getBoundingClientRect().top + window.scrollY - offsetPx;
}

function moveDesktopIndicator(
  desktopIndicator: HTMLElement | null,
  desktopItems: HTMLElement[],
  index: number,
): void {
  const item = desktopItems[index];
  if (!item || !desktopIndicator) return;

  desktopIndicator.style.top = item.offsetTop + "px";
  desktopIndicator.style.height = item.offsetHeight + "px";
}

function moveMobileIndicator(
  mobileIndicator: HTMLElement | null,
  mobileItems: HTMLElement[],
  index: number,
): void {
  const item = mobileItems[index];
  if (!item || !mobileIndicator) return;

  mobileIndicator.style.left = item.offsetLeft + "px";
  mobileIndicator.style.width = item.offsetWidth + "px";
}

export function moveIndicators(params: MoveIndicatorsParams): void {
  moveDesktopIndicator(
    params.desktopIndicator,
    params.desktopItems,
    params.index,
  );
  moveMobileIndicator(params.mobileIndicator, params.mobileItems, params.index);
}

export function createSectionObserver(
  sections: Array<HTMLElement | null>,
  onSectionIntersect: (section: HTMLElement) => void,
): IntersectionObserver {
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && entry.target instanceof HTMLElement) {
          onSectionIntersect(entry.target);
        }
      });
    },
    {
      rootMargin: "-40% 0px -40% 0px",
    },
  );

  sections.forEach(function (section) {
    if (section) observer.observe(section);
  });

  return observer;
}

export function getDurationFromDistance(
  distancePx: number,
  settings = SCROLL_SETTINGS,
): number {
  const rawDuration = Math.abs(distancePx) / settings.pixelsPerMs;
  return Math.max(
    settings.minDurationMs,
    Math.min(settings.maxDurationMs, rawDuration),
  );
}
