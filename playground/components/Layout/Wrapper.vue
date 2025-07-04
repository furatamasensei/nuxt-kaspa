<template>
  <div class="h-dvh">
    <div class="grid grid-cols-12 h-full relative z-10">
      <div class="col-span-3 h-full">
        <LayoutSidebar />
      </div>
      <div
        class="col-span-9 border-x border-neutral-200 dark:border-neutral-800 p-6 h-full overflow-y-auto"
      >
        <slot />
      </div>
    </div>
    <NuxtImg
      src="/images/glow-bottom-left.png"
      alt="Glow Bottom Left"
      width="1351"
      height="933"
      format="avif"
      class="fixed bottom-0 left-0"
    />
  </div>
</template>
