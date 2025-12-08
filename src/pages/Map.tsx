import GoogleMapComponent from "@/components/ui/google-map";

const InteractiveMapPage = () => {
  return (
    <div className="fixed inset-0 w-full h-full">
      <GoogleMapComponent />
    </div>
  )
};

export default InteractiveMapPage;