import { CSSProperties, useState } from 'react';
import { Article } from 'components/article';
import { ArticleParamsForm } from 'components/article-params-form';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

export const App = () => {
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);
	const [state, setState] = useState<ArticleStateType>(defaultArticleState);

	const handleApply = () => {
		setState(articleState);
	};

	const handleReset = () => {
		setArticleState(defaultArticleState);
		setState(defaultArticleState);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': state.fontFamilyOption.value,
					'--font-size': state.fontSizeOption.value,
					'--font-color': state.fontColor.value,
					'--container-width': state.contentWidth.value,
					'--bg-color': state.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				articleState={articleState}
				setArticleState={setArticleState}
				handleReset={handleReset}
				handleApply={handleApply}
			/>
			<Article />
		</main>
	);
};
