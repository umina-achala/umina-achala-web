// src/components/Hero.tsx
import React, { useState } from "react";
import { Rumi } from "../types/rumi";
import { RumiFacade } from "../data/RumiFacade";
import Card from "./Card";
import StoneModal from "./StoneModal";
import styles from "./Hero.module.css";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState<Rumi | null>(null);
  const featured = RumiFacade.fromJSON().getFeatured(3);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroDescription}>
          <p dangerouslySetInnerHTML={{ __html: t("hero.desc1") }} />
          <p dangerouslySetInnerHTML={{ __html: t("hero.desc2") }} />
        </div>
        <div className={styles.heroGrid}>
          {featured.map((rumi) => (
            <Card
              key={rumi.properties.stone_id}
              item={rumi}
              onClick={setOpen}
            />
          ))}
        </div>
        <section className={styles.heroCta}>
          <a href="/marketplace" className={styles.browseBtn}>
            {t("hero.browse")}
          </a>
        </section>
      </section>
      <StoneModal open={open} setOpen={setOpen} />
    </>
  );
};

export default Hero;
