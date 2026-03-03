import { useEffect } from 'react'
import { Alert } from '@heroui/react'

export default function AlertMessage({ show, onClose, type = 'success', message }) {
    useEffect(() => {
    if (show) {
        const timer = setTimeout(() => {
        onClose()
        }, 3000)
        return () => clearTimeout(timer)
    }
    }, [show, onClose])

    if (!show) return null

    return (
    <div className="absolute top-17 right-4 z-50">
        <Alert color={type} title={message} />
    </div>
    )
}