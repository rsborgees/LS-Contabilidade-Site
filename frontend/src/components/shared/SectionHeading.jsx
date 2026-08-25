export function SectionHeading({ title, description, align = 'center' }) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      <h2 className="section-heading__title">{title}</h2>
      {description && <p className="section-heading__description">{description}</p>}
    </div>
  )
}
