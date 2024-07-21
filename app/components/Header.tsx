interface HeaderProps {
title: string,
sub_title: string
}

export default async function Header({ title, sub_title }: HeaderProps) {
  return (
      <div className="sm:my-10 text-center space-y-2 sm:space-y-5">
        <h1 className="text-4xl font-bold text-off_white">{title}</h1>
        <h2 className="text-xl text-grey_muted">{sub_title}</h2>
      </div>
  )
}