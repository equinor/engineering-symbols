import { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/router';

import { convertInputSvgObjectToAPIStructureObject } from './convertInputSvgObjectToAPIStructureObject';

import { UploadSymbolProps } from '../types';

import { validateSvgFileAction, SymbolUploadStore, ISymbolUploadStore } from '../store';

export type FileUploadErrorType = {
	message: string;
	title?: string;
};

interface FileUploadHookResultType {
	handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
	isSvgFileLoading: boolean;
	autoUploadStatus: string;
	selectedFile: File | null;
	uploadStatus: string;
	svgContent: any;
	error: FileUploadErrorType | null | undefined;
}

export const useFileUpload = (): FileUploadHookResultType => {
	const [error, setError] = useState<FileUploadErrorType | null>();
	const [svgContent, setSvgContent] = useState<any>(null);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [uploadStatus, setUploadStatus] = useState<string>('No file selected.');
	const [autoUploadStatus, setAutoUploadStatus] = useState<string>('');
	const [isSvgFileLoading, setIsSvgFileLoading] = useState<boolean>(false);

	const [formData, setFormData] = useState<FormData | null>(null);
	const { validateSvgQuery } = SymbolUploadStore.useState();
	const { status, data } = validateSvgQuery;

	const dynamicRoute = useRouter().asPath;

	const [finishValidateSvgFile, el] = validateSvgFileAction.useBeckon({ query: formData });

	const uploadFile = (file: File) => {
		setAutoUploadStatus('Uploading...');
		setError(null);
		setIsSvgFileLoading(true);

		const formData = new FormData();
		formData.append('svgFile', file);

		setFormData(formData);
	};

	useEffect(() => {
		console.log('👉', 'status:', status, finishValidateSvgFile, formData);
		if (!finishValidateSvgFile) return;

		if (status === 200 || status === 201) {
			setAutoUploadStatus('Upload successful.');
			handleChange();
			setIsSvgFileLoading(false);
		}

		if (status === 400) {
			console.log('👉', 'data:', data);
			setSelectedFile(null);
			setAutoUploadStatus('Upload failed.');
			setIsSvgFileLoading(false);

			setError({ title: data.title, message: data.detail });
		}

		setFormData(null);
	}, [finishValidateSvgFile]);

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
			uploadFile(file);
			setUploadStatus('File selected. Ready to upload.');
			setError(null);
		} else {
			setFormData(null);
			setSelectedFile(null);
			setUploadStatus('No file selected.');
			setError({ title: 'SVG erorr', message: 'Invalid file format. Please select an SVG file.' });
		}

		event.target.value = '';
	};

	useEffect(() => {
		// Dynamic router to reset the state of validateSvgQuery
		SymbolUploadStore.update((s: ISymbolUploadStore) => {
			s.validateSvgQuery = {};
		});
	}, [dynamicRoute]);

	return { selectedFile, uploadStatus, autoUploadStatus, error, handleFileChange, svgContent, isSvgFileLoading };
};
