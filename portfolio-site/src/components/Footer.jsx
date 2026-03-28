import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-white/5 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-600 text-sm">
        <p>&copy; 2025 {t('footer.copyright')}</p>
        <p>{t('footer.builtWith')}</p>
      </div>
    </footer>
  );
}
