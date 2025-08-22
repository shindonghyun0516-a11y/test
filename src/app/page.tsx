import Calculator from '@/components/Calculator';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
            계산기
          </h1>
          <div className="w-16 h-1 bg-indigo-500 mx-auto rounded-full"></div>
        </div>
        <Calculator />
      </div>
    </div>
  );
}
