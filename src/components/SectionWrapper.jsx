const indices = { projects: '01', news: '02', experience: '03', education: '04', publications: '05', skills: '06', activity: '07', personal: '08', reading: '09', contact: '10' };

export default function SectionWrapper({ id, title, subtitle, children, className = '', action }) {
  return (
    <section id={id} aria-labelledby={id + '-title'} className={'content-section ' + className}>
      <div className="site-container">
        <div className="section-heading">
          <div className="section-heading-main"><span className="section-index" aria-hidden="true">{indices[id]}</span><div><h2 id={id + '-title'}>{title}</h2>{subtitle && <p>{subtitle}</p>}</div></div>
          {action}
        </div>
        {children}
      </div>
    </section>
  );
}
