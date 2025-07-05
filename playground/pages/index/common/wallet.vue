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

const publicKey = ref('')
const privateKey = ref('')
const privateKeyWallet = reactive<Record<string, any>>({})

const generatePrivateKey = () => {
  const mnemonic = useMnemonic().random(12)

  const generatedWallet = wallet.fromMnemonic(mnemonic)

  privateKey.value = generatedWallet.privateKey.toString()
  publicKey.value = generatedWallet.privateKey.toPublicKey().toString()
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

const messageToSign = ref('Change this to whatever you like')
const signedMessage = ref('')
const signMessage = () => {
  signedMessage.value = wallet.signMessage(
    messageToSign.value,
    privateKey.value,
  )
}

const messageToVerify = ref('Change this to whatever you like')
const verifyMessage = () => {
  const isValid = wallet.verifyMessage(
    messageToVerify.value,
    signedMessage.value,
    publicKey.value,
  )

  if (isValid) {
    toast.add({
      title: 'Message is valid.',
      icon: 'i-lucide-check',
      duration: 3000,
    })
  } else {
    toast.add({
      title: 'Message is invalid.',
      icon: 'i-lucide-circle-x',
      color: 'error',
      duration: 3000,
    })
  }
}

const addressToValidate = ref(
  'kaspatest:qz2ljv3twfvnsuunlhxxgqvlvga3pap2w4ccfeytgaxd4asulkszwanfkeu3k',
)

const validateAddress = () => {
  try {
    wallet.validate(addressToValidate.value)
    toast.add({
      title: 'Address is valid.',
      icon: 'i-lucide-check',
      duration: 3000,
    })
  } catch (error) {
    toast.add({
      title: 'Address is invalid.',
      icon: 'i-lucide-circle-x',
      color: 'error',
      duration: 3000,
    })
  }
}

const code = `<script setup lang="ts">
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

  const publicKey = ref('')
  const privateKey = ref('')
  const privateKeyWallet = reactive<Record<string, any>>({})

  const generatePrivateKey = () => {
    const mnemonic = useMnemonic().random(12)

    const generatedWallet = wallet.fromMnemonic(mnemonic)

    privateKey.value = generatedWallet.privateKey.toString()
    publicKey.value = generatedWallet.privateKey.toPublicKey().toString()
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
        title: \`Wallet with index \${generatedWallet.index} already exists.\`,
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

  const messageToSign = ref('Change this to whatever you like')
  const signedMessage = ref('')
  const signMessage = () => {
    signedMessage.value = wallet.signMessage(
      messageToSign.value,
      privateKey.value,
    )
  }

  const messageToVerify = ref('Change this to whatever you like')
  const verifyMessage = () => {
    const isValid = wallet.verifyMessage(
      messageToVerify.value,
      signedMessage.value,
      publicKey.value,
    )

    if (isValid) {
      toast.add({
        title: 'Message is valid.',
        icon: 'i-lucide-check',
        duration: 3000,
      })
    } else {
      toast.add({
        title: 'Message is invalid.',
        icon: 'i-lucide-circle-x',
        color: 'error',
        duration: 3000,
      })
    }
  }

  const addressToValidate = ref(
    'kaspatest:qz2ljv3twfvnsuunlhxxgqvlvga3pap2w4ccfeytgaxd4asulkszwanfkeu3k',
  )

  const validateAddress = () => {
    try {
      wallet.validate(addressToValidate.value)
      toast.add({
        title: 'Address is valid.',
        icon: 'i-lucide-check',
        duration: 3000,
      })
    } catch (error) {
      toast.add({
        title: 'Address is invalid.',
        icon: 'i-lucide-circle-x',
        color: 'error',
        duration: 3000,
      })
    }
  }
<\/script>

<template>
  <UCard variant="subtle">
    <template #header>
      <div class="text-lg font-semibold">useWallet<\/div>
    <\/template>
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
          <\/UButton>
          <UButton block color="neutral" @click="createFromMnemonic">
            Execute
          <\/UButton>
        <\/div>
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
          <\/UCard>
        <\/template>
      <\/InteractivePanel>

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
          <\/UButton>
          <UButton block color="neutral" @click="createFromPrivateKey">
            Execute
          <\/UButton>
        <\/div>
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
          <\/UCard>
        <\/template>
      <\/InteractivePanel>

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
        <\/UButton>
        <template #bottom>
          <UCard v-if="derivedWallets.length > 0" variant="subtle" class="mt-4">
            <VueJsonPretty
              :data="derivedWallets"
              :deep="2"
              class="mt-4"
              theme="dark"
              style="max-height: 300px; overflow-y: auto"
            />
          <\/UCard>
        <\/template>
      <\/InteractivePanel>

      <USeparator />

      <InteractivePanel
        title="Sign Message"
        description="Sign a message with the public key of the wallet."
      >
        <UTextarea
          v-model="publicKey"
          disabled
          :rows="5"
          class="size-full"
          variant="subtle"
          placeholder="Use from private key above"
        />
        <UInput
          v-model="messageToSign"
          class="size-full mt-2"
          variant="subtle"
        />
        <UTextarea
          v-model="signedMessage"
          disabled
          :rows="5"
          class="size-full mt-2"
          variant="subtle"
          placeholder="Signed message will appear here"
        />

        <UButton
          :disabled="!privateKey.length"
          class="mt-4"
          block
          color="neutral"
          @click="signMessage"
        >
          Execute
        <\/UButton>
      <\/InteractivePanel>

      <USeparator />

      <InteractivePanel
        title="Verify Message"
        description="Verify the previously signed message."
      >
        <UTextarea
          v-model="publicKey"
          disabled
          :rows="5"
          class="size-full"
          variant="subtle"
          placeholder="Use from private key above"
        />
        <UInput
          v-model="messageToVerify"
          class="size-full mt-2"
          variant="subtle"
        />

        <UButton
          :disabled="!publicKey.length"
          class="mt-4"
          block
          color="neutral"
          @click="verifyMessage"
        >
          Execute
        <\/UButton>
      <\/InteractivePanel>

      <USeparator />

      <InteractivePanel
        title="Validate Address"
        description="Validate the address format"
      >
        <UTextarea
          v-model="addressToValidate"
          :rows="5"
          class="size-full"
          variant="subtle"
        />

        <UButton
          :disabled="!addressToValidate.length"
          class="mt-4"
          block
          color="neutral"
          @click="validateAddress"
        >
          Execute
        <\/UButton>
      <\/InteractivePanel>
    <\/div>
  <\/UCard>
<\/template>`
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

      <USeparator />

      <InteractivePanel
        title="Sign Message"
        description="Sign a message with the public key of the wallet."
      >
        <UTextarea
          v-model="publicKey"
          disabled
          :rows="5"
          class="size-full"
          variant="subtle"
          placeholder="Use from private key above"
        />
        <UInput
          v-model="messageToSign"
          class="size-full mt-2"
          variant="subtle"
        />
        <UTextarea
          v-model="signedMessage"
          disabled
          :rows="5"
          class="size-full mt-2"
          variant="subtle"
          placeholder="Signed message will appear here"
        />

        <UButton
          :disabled="!privateKey.length"
          class="mt-4"
          block
          color="neutral"
          @click="signMessage"
        >
          Execute
        </UButton>
      </InteractivePanel>

      <USeparator />

      <InteractivePanel
        title="Verify Message"
        description="Verify the previously signed message."
      >
        <UTextarea
          v-model="publicKey"
          disabled
          :rows="5"
          class="size-full"
          variant="subtle"
          placeholder="Use from private key above"
        />
        <UInput
          v-model="messageToVerify"
          class="size-full mt-2"
          variant="subtle"
        />

        <UButton
          :disabled="!publicKey.length"
          class="mt-4"
          block
          color="neutral"
          @click="verifyMessage"
        >
          Execute
        </UButton>
      </InteractivePanel>

      <USeparator />

      <InteractivePanel
        title="Validate Address"
        description="Validate the address format"
      >
        <UTextarea
          v-model="addressToValidate"
          :rows="5"
          class="size-full"
          variant="subtle"
        />

        <UButton
          :disabled="!addressToValidate.length"
          class="mt-4"
          block
          color="neutral"
          @click="validateAddress"
        >
          Execute
        </UButton>
      </InteractivePanel>
    </div>
  </UCard>
  <CodeSample :code class="mt-4" />
</template>
