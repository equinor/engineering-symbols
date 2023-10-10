import { PanelDetailsInformationContainer } from './styles';

type PanelDetailsInformationProps = {
	content: string;
};

// onClose?
export const PanelDetailsInformationComponent = ({ content }: PanelDetailsInformationProps) => {
	return <PanelDetailsInformationContainer dangerouslySetInnerHTML={{ __html: content }} />;
};
