
const SinglePage = async({
    params
  }:{
    params: {id: string;}
  }) => {
    console.log(params.id);
        

  return (
    <div>SinglePage</div>
  )
}

export default SinglePage