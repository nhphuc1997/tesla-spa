import { Carousel } from 'antd';

const Slicker = () => {
  return (
    <Carousel dotPosition='left' effect="fade" className='py-3'>
      <div>
        <div className='rounded-lg h-[200px] md:h-[400px] flex justify-center items-center bg-[#364d79]'>1</div>
      </div>
    </Carousel>
  )
}

export default Slicker;
