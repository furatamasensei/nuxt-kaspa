<script setup lang="ts">
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'

const wallet = useWallet()
const toast = useToast()

const mnemonic = ref('')
const mnemonicWallet = reactive<Record<string, any>>({})

const generateMnemonic = () => {
  mnemonic.value = useMnemonic().random(24)
}

const createFromMnemonic = () => {
  if (!mnemonic.value) {
    toast.add({
      title: 'Please enter a mnemonic phrase.',
      icon: 'i-lucide-circle-x',
      color: 'error',
      duration: 3000,
    })
    return
  }

  const generatedWallet = wallet.fromMnemonic(mnemonic.value)
  const pubkey = generatedWallet.privateKey.toPublicKey()

  Object.assign(mnemonicWallet, {
    index: generatedWallet.index,
    privateKey: generatedWallet.privateKey.toString(),
    publicKey: pubkey.toString(),
    address: pubkey.toAddress(NetworkType.Testnet).toString(),
    walletType: generatedWallet.walletType,
    xprv: generatedWallet.xprv.toJSON(),
  })
}

const privateKey = ref('')
const privateKeyWallet = reactive<Record<string, any>>({})

const generatePrivateKey = () => {
  const mnemonic = useMnemonic().random(12)

  const generatedWallet = wallet.fromMnemonic(mnemonic)

  privateKey.value = generatedWallet.privateKey.toString()
}

const createFromPrivateKey = () => {
  const generatedWallet = wallet.fromPrivateKey(privateKey.value)

  const pubkey = generatedWallet.privateKey.toPublicKey()

  Object.assign(privateKeyWallet, {
    privateKey: generatedWallet.privateKey.toString(),
    publicKey: pubkey.toString(),
    address: pubkey.toAddress(NetworkType.Testnet).toString(),
    walletType: generatedWallet.walletType,
  })
}

const derivationIndex = ref(1)
const derivedWallets = ref<any>([])
const deriveWallet = () => {
  if (!mnemonic.value) {
    toast.add({
      title: 'Please enter a mnemonic phrase.',
      icon: 'i-lucide-circle-x',
      color: 'error',
      duration: 3000,
    })
    return
  }

  const generatedWallet = wallet.create(
    mnemonic.value,
    WalletType.HD,
    derivationIndex.value,
  )

  const exists = derivedWallets.value.some(
    (w: any) => w.index === generatedWallet.index,
  )

  if (exists) {
    toast.add({
      title: `Wallet with index ${generatedWallet.index} already exists.`,
      icon: 'i-lucide-circle-x',
      color: 'warning',
      duration: 3000,
    })
    return
  }

  const pubkey = generatedWallet.privateKey.toPublicKey()

  derivedWallets.value.push({
    index: generatedWallet.index,
    privateKey: generatedWallet.privateKey.toString(),
    publicKey: pubkey.toString(),
    address: pubkey.toAddress(NetworkType.Testnet).toString(),
    walletType: generatedWallet.walletType,
  })

  derivationIndex.value += 1
}

const messageToSign = ref('Hello World! Hello Kaspa!')
const signMessage = () => {}
</script>

<template>
  <UCard variant="subtle">
    <template #header>
      <div class="text-lg font-semibold">useWallet</div>
    </template>
    <div class="space-y-6">
      <InteractivePanel
        title="From Mnemonic"
        description="Create or import a wallet from the supplied mnemonic phrase."
      >
        <UTextarea
          v-model="mnemonic"
          :rows="5"
          class="size-full"
          variant="subtle"
          placeholder="Generate or paste your mnemonic phrase here"
        />
        <div class="grid grid-cols-2 gap-4 mt-4">
          <UButton
            block
            color="neutral"
            variant="soft"
            @click="generateMnemonic"
          >
            Generate Random
          </UButton>
          <UButton block color="neutral" @click="createFromMnemonic">
            Execute
          </UButton>
        </div>
        <template #bottom>
          <UCard
            v-if="Object.keys(mnemonicWallet).length > 0"
            variant="subtle"
            class="mt-4"
          >
            <VueJsonPretty
              :data="mnemonicWallet"
              :deep="2"
              class="mt-4"
              theme="dark"
              style="max-height: 300px; overflow-y: auto"
            />
          </UCard>
        </template>
      </InteractivePanel>

      <USeparator />

      <InteractivePanel
        title="From Private Key"
        description="Create or import a wallet from the supplied private key."
      >
        <UTextarea
          v-model="privateKey"
          :rows="5"
          class="size-full"
          variant="subtle"
          placeholder="Generate or paste your private key here"
        />
        <div class="grid grid-cols-2 gap-4 mt-4">
          <UButton
            block
            color="neutral"
            variant="soft"
            @click="generatePrivateKey"
          >
            Generate Random
          </UButton>
          <UButton block color="neutral" @click="createFromPrivateKey">
            Execute
          </UButton>
        </div>
        <template #bottom>
          <UCard
            v-if="Object.keys(privateKeyWallet).length > 0"
            variant="subtle"
            class="mt-4"
          >
            <VueJsonPretty
              :data="privateKeyWallet"
              :deep="2"
              class="mt-4"
              theme="dark"
              style="max-height: 300px; overflow-y: auto"
            />
          </UCard>
        </template>
      </InteractivePanel>

      <USeparator />

      <InteractivePanel
        title="Derive"
        description="Create new wallet derived from the current HD wallet."
      >
        <UTextarea
          v-model="mnemonic"
          disabled
          :rows="5"
          class="size-full"
          variant="subtle"
          placeholder="Use from mnemonic key above"
        />
        <UInputNumber
          v-model="derivationIndex"
          class="size-full mt-2"
          variant="subtle"
          :min="1"
        />

        <UButton
          :disabled="!mnemonic.length"
          class="mt-4"
          block
          color="neutral"
          @click="deriveWallet"
        >
          Execute
        </UButton>
        <template #bottom>
          <UCard v-if="derivedWallets.length > 0" variant="subtle" class="mt-4">
            <VueJsonPretty
              :data="derivedWallets"
              :deep="2"
              class="mt-4"
              theme="dark"
              style="max-height: 300px; overflow-y: auto"
            />
          </UCard>
        </template>
      </InteractivePanel>
    </div>
  </UCard>
</template>
