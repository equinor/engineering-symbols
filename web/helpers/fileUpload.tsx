import { useState, useEffect, ChangeEvent } from 'react';
import axios, { AxiosResponse } from 'axios'; // Make sure to install axios or use your preferred HTTP client

import { getMsGraph } from '../utils/MsGraphApiCall';
import { convertInputSvgObjectToAPIStructureObject } from './convertInputSvgObjectToAPIStructureObject';

import { UploadSymbolProps } from '../types';

interface FileUploadHookResult {
	handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
	isSvgFileLoading: boolean;
	autoUploadStatus: string;
	selectedFile: File | null;
	uploadStatus: string;
	svgContent: any;
	error: string;
}

const API_URL = 'https://dev-engsym-api.azurewebsites.net/symbols';

export const useFileUpload = (): FileUploadHookResult => {
	const [error, setError] = useState<string>('');
	const [svgContent, setSvgContent] = useState<any>(null);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [uploadStatus, setUploadStatus] = useState<string>('No file selected.');
	const [autoUploadStatus, setAutoUploadStatus] = useState<string>('');
	const [isSvgFileLoading, setIsSvgFileLoading] = useState<boolean>(false);

	useEffect(() => {
		const uploadFile = async () => {
			if (selectedFile) {
				try {
					setAutoUploadStatus('Uploading...');
					setError('');
					setIsSvgFileLoading(true);

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
						setIsSvgFileLoading(false);
					} else {
						setAutoUploadStatus('Upload failed.');
						setIsSvgFileLoading(false);
					}
				} catch (error) {
					setAutoUploadStatus('An error occurred during upload.');
					// setError('Error uploading file. Please try again.');
					// @ts-ignore
					setError(error?.message);
					console.error(error);
					setIsSvgFileLoading(false);
				}
			} else {
				setAutoUploadStatus('');
				setError('No file selected.');
				setIsSvgFileLoading(true);
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
		reader.onload = ({ target }) => {
			const contents = target?.result as string;
			const parser = new DOMParser();
			const svgDocument = parser.parseFromString(contents, 'image/svg+xml');

			if (selectedFile === null) return;

			const keyName = selectedFile.name.replace('.svg', '');
			const convertedSvgToObject = convertSvgToObject(svgDocument.documentElement);
			const svgContent = convertInputSvgObjectToAPIStructureObject(convertedSvgToObject, keyName) as unknown as UploadSymbolProps;

			setSvgContent(svgContent);
		};

		if (selectedFile === null) return;

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

	return { selectedFile, uploadStatus, autoUploadStatus, error, handleFileChange, svgContent, isSvgFileLoading };
};
