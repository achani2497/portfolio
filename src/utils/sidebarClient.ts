import {
  NAVIGATION_OFFSET_PX,
  createSectionObserver,
  getDurationFromDistance,
  getSectionsFromNavItems,
  getTargetYForSection,
  moveIndicators,
  revealNavigation,
} from "./sidebarNavigation";

type SidebarRefs = {
  sidebar: HTMLElement | null;
  mobileNav: HTMLElement | null;
  desktopItems: HTMLElement[];
  mobileItems: HTMLElement[];
  desktopIndicator: HTMLElement | null;
  mobileIndicator: HTMLElement | null;
};

let currentScrollAnimationId: number | null = null;
let isProgrammaticScroll = false;

export function initializeSidebarNavigation(): void {
  const refs = getSidebarReferences();
  if (!refs.desktopItems.length && !refs.mobileItems.length) return;

  revealNavigation(refs.sidebar, refs.mobileNav);

  const sections = getSectionsFromNavItems(refs.desktopItems);
  registerClickNavigation(refs.desktopItems, refs);
  registerClickNavigation(refs.mobileItems, refs);
  registerSectionTracking(sections, refs);
  setInitialIndicator(refs);
}

function getSidebarReferences(): SidebarRefs {
  return {
    sidebar: document.querySelector<HTMLElement>("#sidebar"),
    mobileNav: document.querySelector<HTMLElement>("#mobile-nav"),
    desktopItems: Array.from(
      document.querySelectorAll<HTMLElement>(".sidebar-item"),
    ),
    mobileItems: Array.from(
      document.querySelectorAll<HTMLElement>(".mobile-nav-item"),
    ),
    desktopIndicator: document.getElementById("sidebar-indicator"),
    mobileIndicator: document.getElementById("mobile-indicator"),
  };
}

function setActiveIndicator(refs: SidebarRefs, index: number): void {
  moveIndicators({
    index,
    desktopIndicator: refs.desktopIndicator,
    desktopItems: refs.desktopItems,
    mobileIndicator: refs.mobileIndicator,
    mobileItems: refs.mobileItems,
  });
}

function registerClickNavigation(
  navItems: HTMLElement[],
  refs: SidebarRefs,
): void {
  navItems.forEach(function (item, index) {
    item.addEventListener("click", function () {
      navigateToItemSection(item);
      setActiveIndicator(refs, index);
    });
  });
}

function navigateToItemSection(item: HTMLElement): void {
  const sectionId = item.getAttribute("data-id");
  if (!sectionId) return;

  const targetSection = document.getElementById(sectionId);
  if (!targetSection) return;

  const targetY = getTargetYForSection(targetSection, NAVIGATION_OFFSET_PX);
  smoothScrollTo(targetY);
}

function registerSectionTracking(
  sections: Array<HTMLElement | null>,
  refs: SidebarRefs,
): void {
  createSectionObserver(sections, function (targetSection) {
    if (isProgrammaticScroll) return;

    const targetSectionIndex = sections.findIndex(function (section) {
      return section === targetSection;
    });

    if (targetSectionIndex !== -1) {
      setActiveIndicator(refs, targetSectionIndex);
    }
  });
}

function setInitialIndicator(refs: SidebarRefs): void {
  requestAnimationFrame(function () {
    setActiveIndicator(refs, 0);
  });
}

function smoothScrollTo(targetY: number, durationMs?: number): void {
  isProgrammaticScroll = true;

  const startScrollY = window.scrollY;
  const distanceToTravel = targetY - startScrollY;

  if (Math.abs(distanceToTravel) < 1) {
    isProgrammaticScroll = false;
    return;
  }

  const animationDurationMs =
    typeof durationMs === "number"
      ? durationMs
      : getDurationFromDistance(distanceToTravel);

  cancelCurrentScrollAnimation();

  const animationStartTime = performance.now();

  function animateScrollFrame(currentTime: number): void {
    const elapsedMs = currentTime - animationStartTime;
    const progress = Math.min(elapsedMs / animationDurationMs, 1);
    const nextScrollY = startScrollY + distanceToTravel * progress;

    window.scrollTo(0, nextScrollY);

    if (progress < 1) {
      currentScrollAnimationId = requestAnimationFrame(animateScrollFrame);
      return;
    }

    window.scrollTo(0, targetY);
    currentScrollAnimationId = null;
    isProgrammaticScroll = false;
  }

  currentScrollAnimationId = requestAnimationFrame(animateScrollFrame);
}

function cancelCurrentScrollAnimation(): void {
  if (currentScrollAnimationId === null) return;
  cancelAnimationFrame(currentScrollAnimationId);
  currentScrollAnimationId = null;
}
