// src/components/StoneModal.tsx
import React from "react";
import { Rumi } from "../types/rumi";
import styles from "./StoneModal.module.css";
import { useTranslation } from "react-i18next";

interface StoneModalProps {
  open: Rumi | null;
  setOpen: (item: Rumi | null) => void;
}

const StoneModal: React.FC<StoneModalProps> = ({ open, setOpen }) => {
  const { t } = useTranslation();
  if (!open) return null;

  return (
    <div className={styles.modal} onClick={() => setOpen(null)}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <button className={styles.close} onClick={() => setOpen(null)}>
            ×
          </button>
          <h2>
            {open.attributes.find((a) => a.trait_type === "Stone Type")?.value}
          </h2>
        </div>
        <div className={styles.modalBody}>
          <img src={open.image} alt={open.name} width="100%" height="100%" />
          <div>
            <h2>
              {
                open.attributes.find((a) => a.trait_type === "Stone Type")
                  ?.value
              }
            </h2>
            <div className={styles.attributeList}>
              <dl>
                {open.attributes
                  .filter(
                    (attr) =>
                      attr.trait_type !== "HS Code" &&
                      attr.value !== "" &&
                      attr.trait_type !== "Stone Type",
                  )
                  .map((attr) => (
                    <div className={styles.traitType} key={attr.trait_type}>
                      <dt>{attr.trait_type}</dt>
                      <dd>{attr.value}</dd>
                    </div>
                  ))}
              </dl>
            </div>
            <div className={styles.hashscanLinks}>
              {open.tokenId && open.serialNumber && (
                <p>
                  <a
                    href={`https://hashscan.io/mainnet/token/${open.tokenId}/nft/${open.serialNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("modal.viewHashscan")}
                  </a>
                </p>
              )}

              {/* Compliance HCS link (from hcs_compliance_topic) */}
              {open.properties.hcs_compliance_topic && (
                <p>
                  <a
                    href={`https://hashscan.io/mainnet/topic/${open.properties.hcs_compliance_topic}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("modal.viewCompliance")}
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoneModal;
