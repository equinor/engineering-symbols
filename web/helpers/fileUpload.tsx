import { useState, useEffect, ChangeEvent } from 'react';
import axios, { AxiosResponse } from 'axios'; // Make sure to install axios or use your preferred HTTP client
import { getMsGraph } from '../utils/MsGraphApiCall';
import { convertInputSvgObjectToAPIStructureObject } from './convertInputSvgObjectToAPIStructureObject';
import { WebSymbolsProps } from '../types';

interface FileUploadHookResult {
	selectedFile: File | null;
	uploadStatus: string;
	autoUploadStatus: string;
	svgContent: any;
	error: string;
	handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const API_URL = 'https://dev-engsym-api.azurewebsites.net/symbols';

export const useFileUpload = (): FileUploadHookResult => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [svgContent, setSvgContent] = useState<any>(null);
	const [uploadStatus, setUploadStatus] = useState<string>('No file selected.');
	const [autoUploadStatus, setAutoUploadStatus] = useState<string>('');
	const [error, setError] = useState<string>('');

	useEffect(() => {
		const uploadFile = async () => {
			if (selectedFile) {
				try {
					setAutoUploadStatus('Uploading...');
					setError('');

					const formData = new FormData();
					formData.append('svgFile', selectedFile);

					const rt = await getMsGraph();

					const response: AxiosResponse = await axios.post(API_URL, formData, {
						headers: {
							'Content-Type': 'multipart/form-data',
							Authorization: rt?.bearer,
						},
					});

					if (response.status === 200 || response.status === 201) {
						setAutoUploadStatus('Upload successful.');
						handleChange();
					} else {
						setAutoUploadStatus('Upload failed.');
					}
				} catch (error) {
					setAutoUploadStatus('An error occurred during upload.');
					setError('Error uploading file. Please try again.');
					console.error(error);
				}
			} else {
				setAutoUploadStatus('');
				setError('No file selected.');
			}
		};

		if (selectedFile) {
			uploadFile();
		}
	}, [API_URL, selectedFile]);

	const convertSvgToObject = (svgElement: Element): object => {
		const svgData: any = {};
		svgData.tagName = svgElement.tagName.toLowerCase();

		// Store attributes
		const attributes = svgElement.attributes;
		for (let i = 0; i < attributes.length; i++) {
			const { name, value } = attributes[i];
			svgData[name] = value;
		}

		// Store child elements
		const children = svgElement.children;
		if (children.length > 0) {
			svgData.children = [];
			for (let i = 0; i < children.length; i++) {
				const childElement = children[i];
				const childData = convertSvgToObject(childElement);

				svgData.children.push(childData);
			}
		}

		return svgData;
	};

	const handleChange = () => {
		const reader = new FileReader();
		// console.log(1);
		reader.onload = ({ target }) => {
			// console.log(2);
			const contents = target?.result;

			const parser = new DOMParser();
			const svgDocument = parser.parseFromString(contents, 'image/svg+xml');
			const svgElement = svgDocument.documentElement;
			console.log(9, svgElement);
			const keyName = selectedFile.name.replace('.svg', '');
			const convertedSvgToObject = convertSvgToObject(svgElement);
			const svgContent = convertInputSvgObjectToAPIStructureObject(convertedSvgToObject, keyName) as unknown as WebSymbolsProps;

			// console.log(10, 'svgContent:', svgContent)

			setSvgContent(svgContent);
		};

		reader.readAsText(selectedFile);
	};

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file && file.type === 'image/svg+xml') {
			setSelectedFile(file);
			setUploadStatus('File selected. Ready to upload.');
			setError('');
		} else {
			setSelectedFile(null);
			setUploadStatus('No file selected.');
			setError('Invalid file format. Please select an SVG file.');
		}
	};

	return { selectedFile, uploadStatus, autoUploadStatus, error, handleFileChange, svgContent };
};
