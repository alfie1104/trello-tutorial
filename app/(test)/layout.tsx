const TestLayout = ({ children }: { children: React.ReactNode }) => {
  // 파일명은 아무렇게나 지정해도 되지만 나중에 보기쉽도록 Test 폴더속에 있는 Layout파일이므로 TestLayout으로 정했음
  return (
    <div className="h-full">
      <div>This is a navbar</div>
      <hr />
      {children}
    </div>
  );
};

export default TestLayout;
