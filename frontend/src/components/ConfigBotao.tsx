'use client'

import Link from 'next/link'
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, CardContent } from '@/components/ui/card'

interface ConfigBotaoProps {
    href: string
    icon: IconDefinition
    title: string
    className?: string
    iconColor?: string
}

export function ConfigBotao({ href, icon, title, className, iconColor = '' }: ConfigBotaoProps) {
    return (
        <Link href={href}>
            <Card className={`cursor-pointer hover:bg-gray-50 transition-colors ${className}`}>
                <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={icon} style={{ color: iconColor }} />
                        <h3 className="text-lg font-semibold text-zinc-800">{title}</h3>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
