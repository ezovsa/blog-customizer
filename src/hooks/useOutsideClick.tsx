import React, { useEffect } from 'react';

export function useOutsideClick<T extends HTMLElement>(
	ref: React.RefObject<T>,
	handler: () => void,
	enabled = true
) {
	useEffect(() => {
		if (!enabled) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				handler();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ref, handler, enabled]);
}
