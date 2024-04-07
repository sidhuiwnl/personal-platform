
import CreateRoomForm from "./create-form"

export default function CreateRoom(){
    return(
        <div className="container mx-auto flex flex-col gap-8 pt-12 pb-12">
            <h1 className="text-4xl font-bold">Create room</h1>
            
                <CreateRoomForm/>
            
        </div>
    )
}