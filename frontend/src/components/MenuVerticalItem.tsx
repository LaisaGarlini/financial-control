import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

interface MenuVerticalItemProps {
    href: string
    icon: IconDefinition
    title: string
    disabled?: boolean
}

export function MenuVerticalItem({ href, icon, title, disabled }: MenuVerticalItemProps) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Link
                    href={disabled ? '' : href}
                    className={
                        disabled
                            ? 'flex items-center justify-center p-2 rounded'
                            : 'flex items-center justify-center p-2 hover:bg-zinc-700 rounded'
                    }
                >
                    <FontAwesomeIcon icon={icon} className={disabled ? 'text-zinc-700' : 'text-xl'} />
                </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
                <p>{title}</p>
            </TooltipContent>
        </Tooltip>
    )
}
