<template>
  <div class="max-w-7xl mx-auto h-dvh">
    <div class="grid grid-cols-12 h-full">
      <div class="col-span-4 h-full">
        <LayoutSidebar />
      </div>
      <div
        class="col-span-8 border-x border-neutral-200 dark:border-neutral-800 p-6 h-full overflow-y-auto"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
