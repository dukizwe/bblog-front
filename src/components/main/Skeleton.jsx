import "../../css/app/skeleton.scss"

export default function Skeleton(props) {
          return <div className="skeleton" style={
                    {...props}
          }>{props.children}</div>
}