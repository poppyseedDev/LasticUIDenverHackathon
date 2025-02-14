import PrimaryButton from '@/components/button/PrimaryButton'
import Modal from '@/components/modal/Modal'
import { truncateHash } from '@/utils/truncateHash'
import { encodeAddress } from '@polkadot/util-crypto'
import { TxButtonProps, useInkathon, useTxButton } from '@poppyseed/lastic-sdk'
import { FC, useState } from 'react'

interface TransferModalProps {
  isOpen: boolean
  onClose: () => void
  coreNb: string
  mask: string
  begin: string
}

interface RegionId {
  begin: number
  core: number
  mask: Uint8Array
}

interface TransferCall {
  regionId: RegionId
  newOwner: Uint8Array
}

const TransferModal: FC<TransferModalProps> = ({ isOpen, onClose, coreNb, begin, mask }) => {
  const { api, activeSigner, activeAccount, activeChain } = useInkathon()
  const [newOwner, setNewOwner] = useState('')

  const regionId = {
    begin: begin.replace(/,/g, ''),
    core: coreNb,
    mask: mask,
  }

  const txButtonProps: TxButtonProps = {
    api, // api is guaranteed to be defined here
    setStatus: (status: string | null) => console.log('tx status:', status),
    attrs: {
      palletRpc: 'broker',
      callable: 'transfer',
      inputParams: [regionId, newOwner],
      paramFields: [
        { name: 'regionId', type: 'Object', optional: false },
        { name: 'newOwner', type: 'String', optional: false },
      ],
    },
    type: 'SIGNED-TX',
    activeAccount,
    activeSigner,
  }

  const { transaction, status, allParamsFilled } = useTxButton(txButtonProps)

  if (!isOpen) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Transfer Core Nb: ${coreNb} To Another Account`}
    >
      <div className="flex flex-col p-4">
        <div className="flex flex-col mb-4">
          <p className="text-lg font-semibold mb-2">Transfer Core Nb: {coreNb}</p>
          <p className="text-lg mb-2">
            From:{' '}
            {activeAccount
              ? truncateHash(encodeAddress(activeAccount.address, activeChain?.ss58Prefix || 42), 8)
              : 'error'}
          </p>
          <label htmlFor="newOwner" className="text-lg font-semibold mb-2">
            To:
          </label>
          <input
            id="newOwner"
            className="text-lg border border-gray-300 rounded-md p-2 mb-4 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            value={newOwner}
            onChange={(e) => setNewOwner(e.target.value)}
          />
          <p className="text-lg mb-2">Region Begin: {begin}</p>
          <p className="text-md">Core Mask: {mask}</p>
        </div>
        <div className="flex justify-center pt-5">
          <PrimaryButton
            title="Transfer Core"
            onClick={transaction}
            disabled={!allParamsFilled()}
          />
          <div className="mt-5 text-sm text-gray-16 ">{status}</div>
        </div>
      </div>
    </Modal>
  )
}

export default TransferModal
