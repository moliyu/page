export const Search: FC<{
    change?: (kw: string) => void
}> = ({ change }) => {
    const [active, setActive] = useState(false)
    const [focus, setFocus] = useState(false)
    const enter = () => {
        setActive(true)
    }
    const leave = () => {
        if (!focus) setActive(false)
    }
    return <div className="relative w-30px h-30px" onMouseEnter={enter} onMouseLeave={leave}>
        <input
            onFocus={() => setFocus(true)}
            onBlur={() => {
                setFocus(false)
                setActive(false)
            }}
            onChange={change ? e => change(e.target.value) : () => { }}
            placeholder="PLEASE INPUT KEYWORD"
            type="text"
            className={cn("h-30px px-20px transition-all right-0 duration-150 ease-in absolute outline-0!", active ? 'w-280px border-#ccc! border-1px border-solid' : 'w-30px border-transparent ')} />
        <i className="i-mdi:magnify absolute right-12px top-0 text-16px text-black h-full"></i>
    </div>
}