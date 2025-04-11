import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const toastMessages: Record<string, { type: 'success' | 'error' | 'info', message: string }> = {
    'email-verify-success': {
        type: 'success',
        message: 'Registro confirmado com sucesso!\nAgora faça login com seu email e senha.',
    },
    'email-verify-error': {
        type: 'error',
        message: 'Token inválido ou expirado.',
    },
};

export function ToastHandler() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const toastParam = params.get('toast');

        if (toastParam && toastMessages[toastParam]) {
            const { type, message } = toastMessages[toastParam];
            toast[type](message);

            // remove o parâmetro da URL após exibir o toast
            params.delete('toast');
            navigate(`${location.pathname}?${params.toString()}`, { replace: true });
        }
    }, [location, navigate]);

    return null;
}
