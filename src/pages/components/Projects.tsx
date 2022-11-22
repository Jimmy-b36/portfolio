import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const Projects = () => {
  const data = fetch('https://localhost:1337/api/projects', {headers:{Authorization: 'bearer 349d940b9ac04f382bf4c5111f8ee73b9cec4187aa965e3c3f2953f54015b9bd605555ae241b51e2209b49d9a8618d34fe086616a3eb52df02a4fc23387e502246d276db1aea81872ed1098b89c44c0b10f56ab964ca3eafb3b9b49e3605c830c57dd21609e258b02c44ab47fd50070adbf3d6889997d8899f47f9d792e5af9b'}})
	.then(response => response.json())
	.then(data => console.log(data))
	.catch(err => console.error(err));
  console.log(data)
  return <div className="w-full">Projects</div>;
};

export default Projects;
