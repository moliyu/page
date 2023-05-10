import ShuffleText from "shuffle-text";

type props = {
    className?: string
    active?: boolean
    isOuter?: boolean
}

export const SText: FC<PropsWithChildren<props>> = ({ className, children, active, isOuter }) => {
    const el = useRef<HTMLDivElement>(null)
    const [text, set] = useState<ShuffleText>()
    useLayoutEffect(() => {
        set(text => {
            text = new ShuffleText(el.current!)
            text.duration = 200
            text.setText(children as string)
            text.emptyCharacter = 'A'
            text.start()
            return text
        })
    }, [])
    useEffect(() => {
        if (active && isOuter) {
            text?.start()
        }
    }, [active])
    return <div ref={el} className={cn(className, 'overflow-hidden cursor-pointer')} onMouseEnter={() => !isOuter && text?.start()}>{children}</div>
}