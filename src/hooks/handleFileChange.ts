import axios from "@/api/axios";

const handleFileChange = async (event: any, setImageUrl: (value: string) => void) => {
  try {
    const formData = new FormData();
    const file = event.target.files[0];
    formData.append('image', file);

    const { data } = await axios.post('/upload', formData);
    setImageUrl(data.url);
  } catch (err) {
    console.log(err);
  }
}

export default handleFileChange;