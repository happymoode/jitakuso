import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error in React Component:', error, errorInfo);
  }

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-2xl p-6 shadow-lg border border-stone-200 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-xl font-bold">
              自
            </div>
            <h1 className="text-xl font-bold text-stone-900">自宅 (jitakus.com)</h1>
            <p className="text-stone-600 text-sm">
              ページの読み込み中に問題が発生しました。再読み込みをお試しください。
            </p>
            <button
              onClick={() => {
                window.location.href = '/';
              }}
              className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-medium rounded-xl transition cursor-pointer"
            >
              トップページに戻る
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
