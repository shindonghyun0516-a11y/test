import Calculator from '@/components/Calculator';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          계산기
        </h1>
        <Calculator />
      </div>
    </div>
  );
}
