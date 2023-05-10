import { Category } from "../App";

export const CategoryList: FC<{ list: Category[] }> = ({ list }) => {
    const get_image_address = (record: Category) => {
        const imageObj = record.acf
        return imageObj.mobile_image.sizes["mobile-thumbnail"]

    }
    const [active, setActive] = useState(-1)
    return <>
        <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 px-80px gap-[10px_65px]">
            {list.map((item, i) => {
                return <div className="cursor-pointer" key={item.ID} onMouseEnter={() => setActive(i)}>
                    {/* <img className="w-full h-auto" src={item.acf.mobile_image.sizes["mobile-thumbnail"]} loading="lazy" alt="" /> */}
                    <div className="aspect-ratio-square">
                        <img src={get_image_address(item)} loading="lazy" className="w-full h-full" alt="" />
                    </div>
                    <SText active={active == i} isOuter={true} className="text-ellipsis overflow-x-hidden whitespace-nowrap text-15px mt-23px mb-12px">{item.title}</SText>
                    {item.acf.credits.slice(0, 4).map((item, idx) => {
                        return <p className="text-12px text-#999999 text-ellipsis overflow-x-hidden whitespace-nowrap leading-1.6em" key={idx}>{item.title} : {item.name}</p>
                    })}
                </div>
            })}
        </div>
    </>
}