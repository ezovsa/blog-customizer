import React, { useRef, useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';
import { useOutsideClick } from 'src/hooks/useOutsideClick';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
	articleState: ArticleStateType;
	setArticleState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
	handleApply: () => void;
	handleReset: () => void;
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	handleApply,
	handleReset,
	articleState,
	setArticleState,
}) => {
	const [opened, setOpened] = useState<boolean>(false);
	const sidebarRef = useRef<HTMLDivElement>(null);

	useOutsideClick(sidebarRef, () => setOpened(false), opened);

	const handleToggle = () => {
		setOpened((prev) => !prev);
	};

	const handleChange =
		(fieldName: keyof ArticleStateType) => (value: OptionType) => {
			console.log(value, fieldName);
			setArticleState((prev: ArticleStateType) => ({
				...prev,
				[fieldName]: value,
			}));
		};

	return (
		<>
			<ArrowButton isOpen={opened} onClick={handleToggle} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: opened })}
				ref={sidebarRef}>
				<form className={styles.form} onClick={(e) => e.preventDefault()}>
					<Text size={31} weight={800} uppercase as='h3' align='center'>
						Задайте параметры
					</Text>
					<Select
						selected={articleState.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={handleChange('fontFamilyOption')}
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={articleState.fontSizeOption}
						title='Размер шрифта'
						onChange={handleChange('fontSizeOption')}
					/>
					<Select
						title='Цвет шрифта'
						selected={articleState.fontColor}
						options={fontColors}
						onChange={handleChange('fontColor')}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={articleState.backgroundColor}
						options={backgroundColors}
						onChange={handleChange('backgroundColor')}
					/>
					<Select
						title='Ширина контента'
						selected={articleState.contentWidth}
						options={contentWidthArr}
						onChange={handleChange('contentWidth')}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={handleApply}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
