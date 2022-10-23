import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { QRCodeSVG } from 'qrcode.react';

const style = {
    position: 'absolute',
    color: "black",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40vw',
    height: '70vh',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal({ open, setOpen }) {
    const handleClose = () => setOpen(false);

    const deployedContractAddress = "0xecf178144ccec09417412d66e2ecc8a2841ee228";

    const qrProofRequestJson = {
        id: "83af4e62-d0ea-4e05-8e82-8f325e9f3449",
        typ: "application/iden3comm-plain-json",
        type: "https://iden3-communication.io/proofs/1.0/contract-invoke-request",
        body: {
          transaction_data: {
            contract_address: deployedContractAddress,
            method_id: "b68967e2",
            chain_id: 80001,
            network: "polygon-mumbai"
          },
          reason: "airdrop participation",
          scope: [
            {
              id: 34,
              circuit_id: "credentialAtomicQuerySig",
              rules: {
                query: {
                  allowed_issuers: ["*"],
                  req: {
                    Over18: {
                      $lt: 20010101
                    }
                  },
                  schema: {
                    url:
                      "https://s3.eu-west-1.amazonaws.com/polygonid-schemas/83af4e62-d0ea-4e05-8e82-8f325e9f3449.vocab.schema.json",
                    type: "KYCage"
                  }
                }
              }
            }
          ]
        }
      };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
<h2 id="modal-modal-title"> Scan QR code within Polygon ID app to prove your age</h2>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <QRCodeSVG
                            level="Q"
                            style={{ width: 556,
                            height:300 }}
                            value={JSON.stringify(qrProofRequestJson)}
                        />
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
