type Props = {
  children: React.ReactNode,
  title?: string,
  description?: string,
}

export default function PageLayout({ children, title, description }: Props) {
  return (
    <div className="space-y-6">
        <div className="space-y-1">
            <h2 className="text-3xl font-bold">
                {title}
            </h2>
            <p className="text-muted-foreground">
                {description}
            </p>
        </div>
        {children}
    </div>
  )
}
