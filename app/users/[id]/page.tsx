const IdPage = ({ params }: { params: { id: string } }) => {
  //모든 page.tsx는 기본적으로 server component임. 따라서 특별한 convention을 지켜야함

  // 한편, 파일명은 아무렇게나 지정해도 되지만 나중에 보기쉽도록 id폴더속에 있는 Page파일이므로 IdPage로 정했음
  return <div>ID : {params.id}</div>;
};

export default IdPage;
