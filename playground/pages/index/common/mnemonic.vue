<script setup lang="ts">
const mnemonic = useMnemonic()

const generatedMnemonic = ref('')
const alterableMnemonic = ref('')
const seeedableMnemonic = ref('')

const generateMnemonic = () => {
  const phrase = mnemonic.random(24)
  generatedMnemonic.value = phrase
  alterableMnemonic.value = phrase
  seeedableMnemonic.value = phrase
}

const toast = useToast()

const validateMnemonic = () => {
  if (mnemonic.validate(alterableMnemonic.value) === false) {
    toast.add({
      title: 'Invalid phrase',
      icon: 'i-lucide-circle-x',
      color: 'error',
      duration: 3000,
    })
    return
  }

  toast.add({
    title: 'The mnemonic phrase is valid.',
    icon: 'i-lucide-circle-check',
    duration: 3000,
  })
}

const convertToSeed = () => {
  seeedableMnemonic.value = mnemonic.toSeed(generatedMnemonic.value)
}

const code = `<script setup lang="ts">
  const mnemonic = useMnemonic()

  const generatedMnemonic = ref('')
  const alterableMnemonic = ref('')
  const seeedableMnemonic = ref('')

  const generateMnemonic = () => {
    const phrase = mnemonic.random(24)
    generatedMnemonic.value = phrase
    alterableMnemonic.value = phrase
    seeedableMnemonic.value = phrase
  }

  const toast = useToast()

  const validateMnemonic = () => {
    if (mnemonic.validate(alterableMnemonic.value) === false) {
      toast.add({
        title: 'Invalid phrase',
        icon: 'i-lucide-circle-x',
        color: 'error',
        duration: 3000,
      })
      return
    }

    toast.add({
      title: 'The mnemonic phrase is valid.',
      icon: 'i-lucide-circle-check',
      duration: 3000,
    })
  }

  const convertToSeed = () => {
    seeedableMnemonic.value = mnemonic.toSeed(generatedMnemonic.value)
  }
<\/script>

<template>
  <UCard variant="subtle">
    <template #header>
      <div class="text-lg font-semibold">useMnemonic<\/div>
    <\/template>
    <div class="space-y-6">
      <InteractivePanel
        title="Generate Mnemonic"
        description="Click the button to generate a new mnemonic phrase."
      >
        <UTextarea
          v-model="generatedMnemonic"
          :rows="5"
          disabled
          class="size-full"
          variant="subtle"
          placeholder="The original mnemonic phrase will be generated here"
        />
        <UButton block class="mt-2" color="neutral" @click="generateMnemonic">
          Generate
        <\/UButton>
      <\/InteractivePanel>

      <USeparator />

      <InteractivePanel
        title="Validate Mnemonic"
        description="Try to alter the mnemonic, then hit the button."
      >
        <UTextarea
          v-model="alterableMnemonic"
          :rows="5"
          class="size-full"
          variant="subtle"
          placeholder="The alterable mnemonic phrase will be generated here"
        />
        <UButton
          block
          class="mt-2"
          color="neutral"
          :disabled="!alterableMnemonic.length"
          @click="validateMnemonic"
        >
          Validate
        <\/UButton>
      <\/InteractivePanel>

      <USeparator />

      <InteractivePanel
        title="Convert to Seed"
        description="Hit the button to convert the mnemonic to a seed."
      >
        <UTextarea
          v-model="seeedableMnemonic"
          :rows="5"
          disabled
          class="size-full"
          variant="subtle"
          placeholder="The convertable mnemonic phrase will be generated here"
        />
        <UButton
          block
          class="mt-2"
          color="neutral"
          :disabled="!seeedableMnemonic.length"
          @click="convertToSeed"
        >
          Convert
        <\/UButton>
      <\/InteractivePanel>
    <\/div>
  <\/UCard>
<\/template>`
</script>

<template>
  <UCard variant="subtle">
    <template #header>
      <div class="text-lg font-semibold">useMnemonic</div>
    </template>
    <div class="space-y-6">
      <InteractivePanel
        title="Generate Mnemonic"
        description="Click the button to generate a new mnemonic phrase."
      >
        <UTextarea
          v-model="generatedMnemonic"
          :rows="5"
          disabled
          class="size-full"
          variant="subtle"
          placeholder="The original mnemonic phrase will be generated here"
        />
        <UButton block class="mt-2" color="neutral" @click="generateMnemonic">
          Generate
        </UButton>
      </InteractivePanel>

      <USeparator />

      <InteractivePanel
        title="Validate Mnemonic"
        description="Try to alter the mnemonic, then hit the button."
      >
        <UTextarea
          v-model="alterableMnemonic"
          :rows="5"
          class="size-full"
          variant="subtle"
          placeholder="The alterable mnemonic phrase will be generated here"
        />
        <UButton
          block
          class="mt-2"
          color="neutral"
          :disabled="!alterableMnemonic.length"
          @click="validateMnemonic"
        >
          Validate
        </UButton>
      </InteractivePanel>

      <USeparator />

      <InteractivePanel
        title="Convert to Seed"
        description="Hit the button to convert the mnemonic to a seed."
      >
        <UTextarea
          v-model="seeedableMnemonic"
          :rows="5"
          disabled
          class="size-full"
          variant="subtle"
          placeholder="The convertable mnemonic phrase will be generated here"
        />
        <UButton
          block
          class="mt-2"
          color="neutral"
          :disabled="!seeedableMnemonic.length"
          @click="convertToSeed"
        >
          Convert
        </UButton>
      </InteractivePanel>
    </div>
  </UCard>
  <CodeSample :code class="mt-4" />
</template>
