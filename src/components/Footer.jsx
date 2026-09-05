import { useTranslation } from 'react-i18next';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const { t, i18n } = useTranslation();
  return <footer className="site-footer"><div className="site-container"><p>&copy; {new Date().getFullYear()} {t('footer.copyright')}</p><a href="#about">{i18n.resolvedLanguage === 'zh' ? '返回顶部' : 'Back to top'}<ArrowUp size={15} /></a></div></footer>;
}
