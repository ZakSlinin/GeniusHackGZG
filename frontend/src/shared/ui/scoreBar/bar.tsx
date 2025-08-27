import './bar.scss'

export const Bar = ({ level }: { level: number }) => {
  return (
    <div className={"barContainer"}>
      <div style={
        {
          width: level + "%",
        }
      } className={"bar"}></div>
    </div>
  )
}