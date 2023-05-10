import './App.css'
import axios from 'axios'

type Credit = {
  name: string
  title: string
}

export type Category = {
  ID: number
  title: string
  acf: {
    credits: Credit[]
    mobile_image: {
      sizes: {
        'mobile-thumbnail': string
      }
    }
    mobile_image_is_brightness: boolean
    images: {
      image: {
        sizes: {
          'mobile-thumbnail': string
        }
      }
    }
  }
}

function App() {
  const [kw, setKw] = useState('')
  const [list, setList] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const getData = async () => {
    setLoading(true)
    try {
      const res = await axios.get<Category[]>('/cms/get-posts/?20230509232831')
      setList(res.data)
    } catch (error) {
      console.log("%c Line:14 🥓 error", "color:#4fff4B", error);
    }
    setLoading(false)
  }
  useEffect(() => {
    getData()
  }, [])
  const filterList = useMemo(() => {
    if (!kw) return list
    return list.filter(item => {
      const k = kw.toLowerCase()
      return item.title.toLowerCase().includes(k) || item.acf.credits.some(cre => cre.name.toLowerCase().includes(k))
    })
  }, [kw, list])
  return loading ? 'loading...' : (
    <>
      <div className='flex items-center my-70px text-12px overflow-hidden'>
        <div className='w-34px h-1em bg-black'></div>
        <SText className='ml-80px'>KASHIWA SATO</SText>
        <SText className='ml-20px text-#999 hidden lg-block'>SAMURAI INC.TOKYO</SText>
        <div className="flex-1"></div>
        <div className='text-#999 flex items-center'>
          <SText className='text-black mr-15px'>PROJECT</SText>|
          <SText className='w-51px mx-15px'>PROFILE</SText>|
          <SText className='w-56px mx-15px'>CONTACT</SText>
        </div>
        <div className='text-#999 flex items-center ml-30px mr-80px'>
          <SText className='w-51px mr-15px'>ENGLISH</SText>|
          <SText className='w-51px mx-15px'>JAPANESE</SText>|
          <SText className='w-56px mx-15px'>CHINESE</SText>
          <Search change={(val) => setKw(val)}></Search>
        </div>
      </div>
      <CategoryList list={filterList}></CategoryList>
    </>
  )
}

export default App
