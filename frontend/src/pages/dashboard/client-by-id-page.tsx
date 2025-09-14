import { useParams } from "react-router-dom";

export default function ClientByIdPage() {
    const { id } = useParams<{ id: string }>();
    return (
        <div>

            <p>Client ID: {id}</p>
        </div>
    )
}
