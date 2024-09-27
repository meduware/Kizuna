import { BorderBeam } from "@/components/magicui/border-beam";
import IconHolder from "@/components/ui/icon-holder";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Contributor(): JSX.Element {

  return (
    <section id="contribute" className="min-h-[200px] my-10 flex flex-col gap-5 justify-center items-center w-full">
      <IconHolder icon={<FontAwesomeIcon icon={faUserGroup} />} />
      <div className="text-center space-y-4 mb-10">
        <h3 className="text-5xl font-semibold">Get Connected!</h3>
        <p className="text-lg">Our project is all about fostering meaningful relationships and connections.<br /> We're excited to have you join us and contribute to our success.</p>
      </div>
      <button className='flex relative group'>
        <div className='border rounded-xl p-0.5'>
          <BorderBeam size={20} duration={12} delay={5} colorFrom='grey' colorTo='grey' />
          <div className='border rounded-xl p-0.5'>
            <BorderBeam size={20} duration={12} delay={9} colorFrom='grey' colorTo='grey' />
            <div className='border rounded-xl p-1 relative'>
              <BorderBeam size={20} duration={12} delay={2} colorFrom='grey' colorTo='grey' />
              <div className='bg-gradient-to-br from-green-400 to-blue-500 group-hover:from-green-300 group-hover:to-blue-400 rounded-md p-2 text-lg cursor-pointer transition-all text-white'>Get Started</div>
            </div>
          </div>
        </div>
      </button>
    </section>
  )
}
