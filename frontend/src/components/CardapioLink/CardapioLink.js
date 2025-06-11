import Link from 'next/link';

export default function MenuItemLink({ href, label, itemClassName, linkClassName }) {
    return (
        <li className={itemClassName || ''}>
            <Link href={href} className={linkClassName || ''}>
                {label}
            </Link>
        </li>
    );
}